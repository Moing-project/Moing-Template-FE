import React, { useRef, useState } from "react";
import { useUploadImageMutation } from "../redux/modules/ImageAPI";
import { useNavigate } from "react-router-dom";
import ImageDiv from "../components/ImageDiv";
import { TuiEditor } from "../components/TuiEditor";

export default function Layout() {
  const navigate = useNavigate();
  const [image, setImage] = useState<Array<File>>();
  const [imageSrc, setImageSrc] = useState<Array<string>>();
  const [upload, { isLoading: UploadLoading }] = useUploadImageMutation();

  const setFilesHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(Array.from(event.target.files as FileList));
  };

  const ref = useRef<string>("null");
  const uploadHandler = async () => {
    if (!UploadLoading) {
      const payload = new FormData();
      for (const file of image as Array<File>) {
        payload.append("imageFile", file);
      }
      const res = await upload(payload);
      if ("data" in res) {
        setImageSrc(res.data.data);
      }
    }
  };
  return (
    <>
      <ImageDiv
        imageSrc="https://team4-images-bucket.s3.ap-northeast-2.amazonaws.com/image/2023-08-01Level+2+(3)97a23f74-e4dd-4c21-a70e-1fd0ef35bc00.png"
        width={200}
        height={200}
      />
      <input type="file" multiple onChange={setFilesHandler} />
      <button onClick={uploadHandler}>업로드</button>
      {!!imageSrc &&
        imageSrc.map((e, i) => (
          <img key={i} src={e} alt="" style={{ border: "2px solid black" }} />
        ))}

      <button onClick={() => window.open("http://localhost:3000")}>
        New Windows
      </button>
      <br />
      <button onClick={() => navigate("/login")}>로그인</button>
      <button onClick={() => navigate("/signin")}>회원가입</button>
      <TuiEditor content="HEloasdsafsd" editorRef={ref} />
    </>
  );
}
