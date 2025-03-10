import Image from "next/image";
import DiscordLogo from "../../../../public/discord-logo.png";
export default function DiscordCTA() {
  return (
    <a
      href={`https://discord.gg/${process.env.NEXT_PUBLIC_DISCORD_INVITE_CODE}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="bg-blue-600 text-white  md:py-2 px-4 md:px-6 rounded-lg md:text-xl font-semibold hover:bg-blue-700 transition flex gap-2 items-center">
        <Image src={DiscordLogo} alt="Discord Logo" width={75} height={75} />
        Join the Paul Skenes Discord
      </div>
    </a>
  );
}
