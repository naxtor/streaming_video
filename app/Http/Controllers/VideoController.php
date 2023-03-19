<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Video;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get list of videos
        $videos = Video::all();

        return response()->json(
            [
                "videos" => $videos,
            ],
            200,
        );
    }

    /**
     * Show the form for creating a new resource.`
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|string|max:255',
            'video' => 'required|file|mimetypes:video/mp4',
        ]);

        $path = $this->storeVideo($request);

        if ($path != null) {
            $video = Video::create([
                'title' => $request->title,
                'url' => $path,
            ]);

            return response()->json(
                [
                    'video' => $video,
                ],
                201,
            );
        }

        return response()->json(
            [
                'message' => "Unexpected error",
            ],
            500,
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Video $id)
    {
        $this->validate($request, [
            'title' => 'required|string|max:255',
            'video' => 'file|mimetypes:video/mp4',
        ]);

        $video = $id;
        $video->title = $request->title;

        if ($request->has('video')) {
            $path = $this->storeVideo($request);

            $video->url = $path;
        }

        $video->save();

        return response()->json([
            'video' => $video,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(String $id)
    {
        $video = Video::find($id);

        $segments = explode("/", parse_url($video->url, PHP_URL_PATH));
        $fileName = end($segments);

        Storage::disk('public')->delete('/videos/' . $fileName);

        $video->delete();

        return response()->json([
            'message' => 'Video successfully deleted',
        ]);
    }

    private function storeVideo(Request $request)
    {
        $fileName = $request->video->getClientOriginalName();
        $filePath = 'videos/' . $fileName;

        $isFileUploaded = Storage::disk('public')->put($filePath, file_get_contents($request->video));

        if ($isFileUploaded) {
            $path = $request->schemeAndHttpHost() . Storage::url($filePath);

            return $path;
        }

        return null;
    }
}
