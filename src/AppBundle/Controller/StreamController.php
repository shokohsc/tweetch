<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * @Route("/api/streams")
 */
class StreamController extends Controller
{
    /**
     * @Route("/game/{gameId}/{page}", name="games_streams", defaults={"page" = 1}, requirements={"page" = "\d+"})
     */
    public function gamesAction($gameId, $page = 1)
    {
        $gameId = urldecode($gameId);
        $limit = 9;
        $offset = ($page * $limit) - $limit;
        $params = array(
          'game' => $gameId,
          'limit' => $limit,
          'offset' => $offset,
          'stream_type' => 'live',
        );
        $streams = $this->get('stream.repository')->getStreams($params);
        $streams = $this->get('json.serializer')->encode($streams);
        $json = json_decode($streams);

        return new JsonResponse(['streams' => $json, 'title' => $gameId], 200);
    }

    /**
     * @Route("/featured/{page}", name="featured_streams", defaults={"page" = 1}, requirements={"page" = "\d+"})
     */
    public function featuredAction($page = 1)
    {
        $limit = 9;
        $offset = ($page * $limit) - $limit;
        $params = array(
          'limit' => $limit,
          'offset' => $offset,
        );
        $featuredStreams = $this->get('stream.repository')->getFeaturedStreams($params);
        $featuredStreams = $this->get('json.serializer')->encode($featuredStreams);
        $json = json_decode($featuredStreams);

        return new JsonResponse($json, 200);
    }

    /**
     * @Route("/followed/{page}", name="streams_followed", defaults={"page" = 1}, requirements={"page" = "\d+"})
     */
    public function followedAction(Request $request, $page = 1)
    {
        $accessToken = $request->headers->get('authorization');
        if ($accessToken && !empty($accessToken)) {
            $limit = 9;
            $offset = ($page * $limit) - $limit;
            $params = array(
              'limit' => $limit,
              'offset' => $offset,
              'stream_type' => 'live',
            );
            $accessToken = base64_decode($accessToken);
            $followedStreams = $this->get('stream.repository')->getFollowedStreams($accessToken, $params);
            $followedStreams = $this->get('json.serializer')->encode($followedStreams);
            $json = json_decode($followedStreams);

            return new JsonResponse($json, 200);
        }

        return new JsonResponse(['error' => 'wrong access token'], 400);
    }

    /**
     * @Route("/stream/{sourceId}", name="stream_streams")
     */
    public function streamAction($sourceId)
    {
        $streamsDir = $this->get('kernel')->getRootDir().'/../web/streams/';

        $sourceId = $streamsDir.$sourceId.'.m3u8';

        $ffmpeg = \FFMpeg\FFMpeg::create();
        $video = $ffmpeg->open($sourceId);
        $fileName = uniqid().'.mp4';
        $file = $streamsDir.$fileName;

        $video->save(new \FFMpeg\Format\Video\X264(), $file);
        // $response = new StreamedResponse(function() use ($video, $sourceId) {
        //     $handle = fopen($video->getRealPath(), 'r');
        //     while (!feof($handle)) {
        //       $buffer = fread($handle, 1024);
        //       echo $buffer;
        //       flush();
        //     }
        //     fclose($handle);
        // });
        // $response->headers->set('Content-Type', $video->getMimeType());

        return new JsonResponse($fileName, 200);
    }

    /**
     * @Route("/{channelId}", name="get_streams")
     */
    public function getAction($channelId)
    {
        $stream = $this->get('stream.repository')->getStream($channelId);
        $stream = $this->get('json.serializer')->encode($stream);
        $json = json_decode($stream);

        $channelToken = $this->get('channel.repository')->getChannelToken($channelId);
        $source = 'http://usher.ttvnw.net/api/channel/hls/';
        $source .= $channelId;
        $source .= '.m3u8?token=';
        $source .= urlencode($channelToken->getToken());
        $source .= '&sig=';
        $source .= $channelToken->getSig();
        $source .= '&allow_source=true';

        $streamsDir = $this->get('kernel')->getRootDir().'/../web/streams/';

        if (!is_dir($streamsDir)) {
            mkdir($streamsDir, 0777, true);
        }

        $sourceId = uniqid();
        $content = file_get_contents($source);
        file_put_contents($streamsDir.$sourceId.'.m3u8', $content);

        $fh = fopen($streamsDir.$sourceId.'.m3u8', 'r');
        while (!feof($fh)) {
            $line = fgets($fh, 4096);
            if (preg_match('/chunked/i', $line)) {
              $source = $line;
            }
        }
        fclose($fh);

        foreach(glob($streamsDir . '/*') as $file) {
            // unlink($file);
        }

        return new JsonResponse(['stream' => $json, 'source' => $sourceId], 200);
    }
}
