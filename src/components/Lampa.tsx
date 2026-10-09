interface LampaProps {
  vilagit: boolean;
  kattintas: () => void;
}

export default function Lampa({ vilagit, kattintas }: LampaProps) {
  return (
    <button className={vilagit ? "lampa be" : "lampa ki"} onClick={kattintas} />
  );
}
