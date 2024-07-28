// import { NextRequest, NextResponse } from "next/server";

// export async function Post(reuest:NextRequest){
// const data= await reuest.formData()
// const fileList:File| null =data.get("fileList")as unKnown as File
// if(!fileList){
//     return NextResponse.json({success:false})

// }
// const bytes =await fileList.arrayBuffer()
// const buffer= Buffer.from(bytes)
// const path=join("/",'tmp',fileList.name)
// await writeFile(path,buffer)
// console.log(`open ${path} to see the uploaded file`)
// return NextResponse.json({success:true})
// }

// import { NextResponse } from "next/server";
// import { join } from "path";
// import { writeFile, mkdir } from "fs/promises";

// export async function POST(request) {
//   try {
//     const data = await request.formData();
//     const file = data.get("file");

//     if (!file) {
//       return NextResponse.json({ success: false, message: "No file uploaded" });
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const dir = join(process.cwd(), "public", "uploads");
//     const path = join(dir, file.name);

//     // Ensure the directory exists
//     await mkdir(dir, { recursive: true });

//     await writeFile(path, buffer);

//     const fileUrl = `/uploads/${file.name}`; // URL to access the file

//     return NextResponse.json({ success: true, fileUrl });
//   } catch (error) {
//     return NextResponse.json({
//       success: false,
//       message: `Upload failed: ${error.message}`,
//     });
//   }
// }
import { NextResponse } from "next/server";
import { join } from "path";
import { writeFile, readFile, mkdir } from "fs/promises";

const uploadsDir = join(process.cwd(), "public", "uploads");
const jsonFile = join(uploadsDir, "images.json");

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = join(uploadsDir, file.name);

    // Ensure the directory exists
    await mkdir(uploadsDir, { recursive: true });

    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${file.name}`;

    // Read existing URLs
    let existingUrls = [];
    try {
      const jsonData = await readFile(jsonFile, "utf-8");
      existingUrls = JSON.parse(jsonData);
    } catch (error) {
      // File does not exist or is empty
    }

    // Add new URL to the list
    existingUrls.push(fileUrl);

    // Write updated URLs back to the file
    await writeFile(jsonFile, JSON.stringify(existingUrls, null, 2));

    return NextResponse.json({ success: true, fileUrl });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Upload failed: ${error.message}`,
    });
  }
}

export async function GET() {
  try {
    const jsonData = await readFile(jsonFile, "utf-8");
    const existingUrls = JSON.parse(jsonData);
    return NextResponse.json({ success: true, fileUrls: existingUrls });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Failed to read URLs: ${error.message}`,
    });
  }
}
