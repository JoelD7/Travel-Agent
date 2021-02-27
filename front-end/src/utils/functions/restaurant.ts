import { capitalizeString } from "./functions";

export function getRestaurantCategoriesList(
  restaurant: Restaurant | RestaurantSearch
): string {
  return restaurant.categories.map((c) => c.title).join(", ");
}

export function getRestaurantHours(restaurant: Restaurant) {
  const weekDays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  let timing = [];

  let openHours = restaurant.hours[0].open;
  //Group by timing
  let ranges: { [index: string]: Object[] } = {};
  //Hours objects that belong to the current timing
  let curRange: any[] = [];

  for (let i = 0; i < openHours.length; i++) {
    if (i == 0) {
      const element = openHours[i];
      curRange.push(element);
    } else {
      const curHour = openHours[i];
      const prevHour = openHours[i - 1];
      let curHoursRange: string = curHour.start + "-" + curHour.end;
      let prevHoursRange: string = prevHour.start + "-" + prevHour.end;

      //The hours objects have the same timing and are consecutive days
      if (curHoursRange === prevHoursRange && curHour.day === prevHour.day + 1) {
        curRange.push(curHour);

        if (i === openHours.length - 1) {
          ranges = {
            ...ranges,
            [curHoursRange]: curRange,
          };
        }
      } else {
        /**
         * In the opposite case, add all the hours objects that belong
         * to the previous timing to its correspondent group if it exists
         * and if doesn't, then create it.
         */
        if (ranges.hasOwnProperty(prevHoursRange)) {
          ranges = {
            ...ranges,
            [prevHoursRange]: [...ranges[prevHoursRange], ...curRange],
          };
          curRange = [curHour];
          //If the cur hour is the last, then add it to a group if it exists
          //and if doesn't, then create it
          if (i === openHours.length - 1) {
            ranges = {
              ...ranges,
              [curHoursRange]: curRange,
            };
          }
        } else {
          ranges = {
            ...ranges,
            [prevHoursRange]: curRange,
          };
          curRange = [curHour];
          if (i === openHours.length - 1) {
            ranges = {
              ...ranges,
              [curHoursRange]: curRange,
            };
          }
        }
      }
    }
  }

  for (const range in ranges) {
    if (Object.prototype.hasOwnProperty.call(ranges, range)) {
      const hour: RestaurantHour[] = ranges[range] as RestaurantHour[];
      if (hour.length > 1) {
        timing.push(
          `${weekDays[hour[0].day]} - ${
            weekDays[hour[hour.length - 1].day]
          } from ${parseHour(range)}`
        );
      } else {
        timing.push(`${weekDays[hour[0].day]} from ${parseHour(range)}`);
      }
    }
  }
  return timing.join(", ");
}

function parseHour(value: string) {
  return `${value[0]}${value[1]}:${value[2]}${value[3]} to ${value[5]}${value[6]}:${value[7]}${value[8]}`;
}

export function getRestaurantTransactions(
  restaurant: Restaurant | RestaurantSearch
): string {
  return restaurant.transactions
    .map((tr) => {
      if (tr.split("_").length > 1) {
        return capitalizeString(tr.split("_").join(" "), "full sentence");
      } else {
        return capitalizeString(tr, "full sentence");
      }
    })
    .join(", ");
}

export function getDistinctCuisines(cuisines: { title: string; alias: string }[]) {
  let buffer: { title: string; alias: string }[] = [];
  let record: string[] = [];

  cuisines.forEach((c) => {
    if (!record.includes(c.alias)) {
      buffer.push(c);
      record.push(c.alias);
    }
  });
  return buffer;
}

export function filterByFeature(feature: string, restaurants: RestaurantSearch[]) {
  return restaurants.filter((res) => res.transactions.includes(feature));
}
