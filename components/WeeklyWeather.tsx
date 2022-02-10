import { IDaily } from "../pages/location/interdace";

interface IWeeklyWeather {
    weeklyWeather: IDaily[],
    timezone: string,
}
export default function WeeklyWeather({ weeklyWeather, timezone }: IWeeklyWeather): JSX.Element {
    return (
        <div>s</div>
    )
}