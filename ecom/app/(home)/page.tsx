import HomeCarouselWithProvider from "@/components/shared/home/home-carousel";
import data from "@/lib/data";

export default function Page() {
    return <HomeCarouselWithProvider items={data.carousels} />;
}