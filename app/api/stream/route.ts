import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Stream from "node-rtsp-stream";

let stream: any = null;

export async function GET(req: NextRequest) {
  try {
    const newRtspStreamUrl: any = req.nextUrl.searchParams;
    let currentRtspStreamUrl: any = newRtspStreamUrl.get("rtsp");
    console.log(currentRtspStreamUrl);

    if (!stream || currentRtspStreamUrl !== newRtspStreamUrl) {
      // if (stream || newRtspStreamUrl === "stop") {
      //   stream.pause();
      // }
      stream = new Stream({
        name: "Camera Stream",
        streamUrl: newRtspStreamUrl,
        wsPort: 9999,
      });
      currentRtspStreamUrl = newRtspStreamUrl;
    }

    return NextResponse.json(
      {
        url: "ws://127.0.0.1:9999",
      },
      {
        status: 200,
      }
    );
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ message: err.message });
  }
}
