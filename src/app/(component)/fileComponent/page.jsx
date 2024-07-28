// "use client";
// import React, { useState } from "react";
// import { Image } from "@nextui-org/react";

// export default function Page() {
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState("");

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       console.error("No file selected");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.set("file", file);

//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         console.error("Upload failed:", errorText);
//         throw new Error("Upload failed: " + errorText);
//       }

//       const result = await res.json();
//       setImageUrl(result.fileUrl); // Set the URL of the uploaded image
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
//         <button type="submit">Upload</button>
//       </form>

//       {imageUrl && (
//         <div className="image upload rounded-circle mb-4">
//           <Image width={300} alt="Uploaded Image" src={imageUrl} />
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import { Image } from "@nextui-org/react";

export default function Page() {
  const [file, setFile] = useState(null);
  const [imageUrls, setImageUrls] = useState([]); // Initialize as an empty array

  useEffect(() => {
    // Fetch stored image URLs when the component mounts
    const fetchImageUrls = async () => {
      try {
        const res = await fetch("/api/upload");
        if (res.ok) {
          const result = await res.json();
          setImageUrls(result.fileUrls || []); // Ensure it's an array
        } else {
          console.error("Failed to fetch image URLs");
        }
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    };

    fetchImageUrls();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Upload failed:", errorText);
        throw new Error("Upload failed: " + errorText);
      }

      const result = await res.json();
      setImageUrls((prevUrls) => [...prevUrls, result.fileUrl]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
        <button type="submit">Upload</button>
      </form>

      <div className="image-gallery">
        {imageUrls.map((url, index) => (
          <div key={index} className="image upload rounded-circle mb-4">
            <Image width={300} alt={`Uploaded Image ${index + 1}`} src={url} />
          </div>
        ))}
      </div>
    </div>
  );
}
