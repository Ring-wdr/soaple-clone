import styled from "styled-components";
import { Wrapper } from "../utils/styleUtil";

const ImgWrapper = styled.div`
    position: relative;
`
const ContentImg = styled.img`
    position: relative;
    width: 500px;
    height: 500px;
    object-fit: cover;
`;

const ImgKeyButton = styled.button`
    position: absolute;
    top: 30px;
    left: 450px;
`

const ImageList = ({imgs, isWrite, imgDelete}) => {
 return (
    <Wrapper>
    {imgs.map((img) => !img.isDel ? (
        <ImgWrapper 
            key={`${img.file}thImg`}>
            <ContentImg
            crossOrigin="anonymous"
            src={`http://localhost:8080/${img.path}`}
            // src="http://localhost:8080/166631790727783fd9b09-9121-49fb-8422-aecc86ddad0c.png"
            alt={img.path}
            />
            {isWrite ? <ImgKeyButton key={img.file} onClick={imgDelete} value={img.file}>삭제</ImgKeyButton> : null}
        </ImgWrapper>
    ) : null)}
    </Wrapper>
    
  
  )
}

export default ImageList