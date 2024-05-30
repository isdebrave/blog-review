import styled from "@emotion/styled";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

const ProfileImageWrapper = styled(GatsbyImage)`
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

interface IProfileImage {
  profileImage: IGatsbyImageData;
}

const ProfileImage: React.FC<IProfileImage> = (props) => {
  const { profileImage } = props;

  return <ProfileImageWrapper image={profileImage} alt="Profile Image" />;
};

export default ProfileImage;
