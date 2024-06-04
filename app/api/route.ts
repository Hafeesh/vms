import { execSync } from "child_process";
import fs, { Stats } from "fs";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ReadableOptions } from "stream";

function streamFile(
  path: string,
  options?: ReadableOptions
): ReadableStream<Uint8Array> {
  const downloadStream = fs.createReadStream(path, options);

  return new ReadableStream({
    start(controller) {
      downloadStream.on("data", (chunk: Buffer) =>
        controller.enqueue(new Uint8Array(chunk))
      );
      downloadStream.on("end", () => controller.close());
      downloadStream.on("error", (error: NodeJS.ErrnoException) =>
        controller.error(error)
      );
    },
    cancel() {
      downloadStream.destroy();
    },
  });
}
export async function POST(req: NextRequest) {
  try {
    const { frameNumber } = await req.json();
    const filePath = process.cwd() + "/public/video.mp4";
    const outputPath = process.cwd() + `/public/images/output-test1.jpg`;
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
    execSync(
      `ffmpeg -i ${filePath} -ss ${frameNumber} -vframes 1 ${outputPath}`
    );
    const stats: Stats = await fs.promises.stat(outputPath);
    const data: ReadableStream<Uint8Array> = streamFile(outputPath);
    return new NextResponse(data, {
      status: 200,
      headers: new Headers({
        "content-disposition": `attachment; filename=image.jpg`,
        "content-type": "image/jpg",
        "content-length": stats.size + "",
      }),
    });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ message: err.message });
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const filename = searchParams.get("filename");

    const filePath = process.cwd() + `/public/images/${filename}`;

    if (fs.existsSync(filePath)) {
      return NextResponse.json({
        message: "File found",
      });
    } else {
      return NextResponse.json({
        message: "File not found",
      });
    }
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ message: err.message });
  }
}
