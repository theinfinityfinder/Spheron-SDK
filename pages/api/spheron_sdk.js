import { SpheronClient, ProtocolEnum } from "@spheron/storage";
const AmazonS3URI = require('amazon-s3-uri');
export default async(req,res)=>{
 const  {filePath}= req.body;
 console.log(filePath);
 const {bucket}= AmazonS3URI(filePath);
 console.log(bucket);
 const name= bucket;
 const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiJjNGQ5MDlmMTU2YjAwMmUzYzBhMmMyYmM4N2ZhYmMwZTNiYzgyNjIzOTUxOTI0MjM4MGY0NzJhNThiMDYwMjczOTg4OTVmMzNiMjBjNGE1OWI2MTRkZTNjNGIwNDU2NzRhNDIwYjFiMDA4NWQ2M2UxZDVjYjgzOTQxMjFjYmMxMyIsImlhdCI6MTY4ODMwNTUwMywiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.WzTZ8DnCtyrlfwLFQHQGWNcRN8nP4xvCTPs7K8p6eHc";

 const client = new SpheronClient({ token });
 let currentlyUploaded = 0;
 
    const { uploadId, bucketId, protocolLink, dynamicLinks, cid } =
      await client.upload(filePath, {
        protocol:ProtocolEnum.IPFS,
        name,
        onUploadInitiated: (uploadId) => {
          console.log(`Upload with id ${uploadId} started...`);
        },
        onChunkUploaded: (uploadedSize, totalSize) => {
          currentlyUploaded += uploadedSize;
          console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
        },
      });
    

   res.status(200).send(uploadId, bucketId, protocolLink, dynamicLinks, cid);   
}


