
import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Home () {
  const [filePath, setFilepath]= React.useState();
  
  
  const Submit = async(e)=>{
    e.preventDefault()
    const res = await fetch(`http://localhost:3000/api/spheron_sdk`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          filePath
      }) })
        const res2 = await res.json()
        if(res2.error){
          alert("Error!!!");
        }
        else{
            alert("Upload Successful")
            console.log(res2)
           
     
        } 
      
      
      }
  
  return (
    <div>
      <h1>Drop your S3 bucket url here :
 </h1>

 <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined"  onChange={e=>  setFilepath(e.target.value)}/>
    
    </Box>

 <Stack direction="row" spacing={2}>
      
      <Button variant="contained" endIcon={<SendIcon />}  onClick={(e) =>  Submit(e)}>
        Send
      </Button>
    </Stack>

 <style jsx>{
   `h1{
     color: blue;
     font-family: Oxygen;
     }
   `


 }
</style>
</div>
  )

}


