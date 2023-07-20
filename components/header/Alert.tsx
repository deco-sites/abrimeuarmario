import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";

export interface Props {
  alerts: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id} class="h-[24px]">
      <Slider class="carousel carousel-center bg-pink-primary gap-6 scrollbar-none">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span class="text-top-bar-text p-1 font-semibold flex justify-center items-center w-screen text-xs">
              {alert}
              {alert}
            </span>
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
