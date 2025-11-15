import Header from "@/components/header";
import Container from "./_components/container";

export default function page() {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <Container />
    </div>
  );
}
