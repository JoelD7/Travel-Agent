import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleReg } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../styles";
import { CreateCSSProperties, CSSProperties } from "@material-ui/styles";
import Ratings from "react-ratings-declarative";

interface CircleScore {
  score: number;
  style?: CSSProperties;
}

//'linear-gradient(90deg, red 50%, white 50%)'
export function CircleScore({ score, style }: CircleScore) {
  let wholeScore = Number(score.toFixed());
  let stringScoreArray = score.toString().split(".");
  const [decimal, setDecimal] = useState<number>(0);

  useEffect(() => {
    if (stringScoreArray.length > 1) {
      //   console.log(stringScoreArray);
      let stringDecimal = stringScoreArray[1];

      //Add "0" to percentage
      if (stringDecimal.length === 1) {
        setDecimal(Number(stringScoreArray[1] + "0"));
      } else {
        setDecimal(Number(stringScoreArray[1]));
      }
    }
  }, []);

  return (
    <div style={{ display: "flex", ...style }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width={20} height={20} stroke={Colors.PURPLE} strokeWidth={2}>
          {n <= wholeScore ? (
            <>
              <defs>
                <linearGradient id="myGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="100%" stop-color={Colors.PURPLE} />
                  <stop offset="0%" stop-color="white" />
                </linearGradient>
              </defs>
              <circle cx="8" cy="8" r="7" fill="url('#myGradient1')" />
            </>
          ) : (
            <>
              <defs>
                <linearGradient id="myGradient2" x1="0%" y1="0%" x2="100%" y2="0%">   
                  <stop
                    offset={`${decimal}%`}
                    stop-color={Colors.PURPLE}
                    stopOpacity={1}
                  />
                  <stop offset={`${100 - decimal}%`} stop-color="white" stopOpacity={1} />
                </linearGradient>
              </defs>
              <circle cx="8" cy="8" r="7" fill="url('#myGradient2')" />
            </>
          )}
        </svg>
      ))}
    </div>
  );
}

{
  /* <div style={{ display: "flex", ...style}}>
      {[1, 2, 3, 4, 5].map((n) => (
        <FontAwesomeIcon
          size="xs"
          style={{ margin: "auto 1px" }}
          key={n}
          icon={score >= n ? faCircle : faCircleReg}
          color={'linear-gradient(90deg, red 50%, white 50%)'}
        />
      ))}
    </div> */
}
