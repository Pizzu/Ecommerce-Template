// Libraries
// Types
// Components
import Image from "next/image";
import { ButtonLink } from "@components/common";

type ProfileItemProps = {
  iconURL: string,
  caption: string,
  ctaText: string,
  ctaURL: string
}

const ProfileItem: React.FC<ProfileItemProps> = ({iconURL, caption, ctaText, ctaURL}) => {
  return (
    <div className="bg-white p-8 shadow-xl sm:p-16">
      <div className="text-center">
        <div className="relative w-[3.63rem] h-[3.63rem] m-auto mb-6">
          <Image src={iconURL} alt="star" layout="fill" />
        </div>
        <p className="caption mb-16">{caption}</p>
        <div>
          <ButtonLink href={ctaURL} className="bg-primary text-white">{ctaText}</ButtonLink>
        </div>
      </div>
    </div>
  )
}

export default ProfileItem