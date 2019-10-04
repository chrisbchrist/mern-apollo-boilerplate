import React, {FunctionComponent, ReactElement, RefObject} from 'react';
import {Gradient} from "./GradientPicker";
import { Carousel } from 'antd';

const formatColors: (colors: string[]) => string = colors => {
    let output: string = "";
    for (let i = 0; i < colors.length; i++) {
        if (i === colors.length - 1) {
            output += colors[i];
        } else {
            output += `${colors[i]}, `;
        }
    }
    return output;
};

// Generate page-sized divs for use with AntD carousel containing gradient options
const generatePages: (
    gradients: Gradient[],
    pageSize: number,
    setSelectedGradient: any
) => ReactElement[] = (gradients, pageSize, setSelectedGradient) => {
    let pages: ReactElement[] = [];
    for (let i = 0; i < Math.ceil(gradients.length / pageSize); i++) {
        const min: number = i * pageSize;
        const max: number = (i + 1) * pageSize;
        pages.push(
            <div className="gradients__options" key={"page" + i}>
                {gradients
                    .slice(min, max)
                    .map((gradient: Gradient, index: number) => {
                        const trueIndex = min + index;
                        return (
                            <div
                                key={gradient.name}
                                className="gradient__option"
                                style={{
                                    background: `linear-gradient(to top, ${formatColors(
                                        gradient.colors
                                    )})`
                                }}
                                onClick={() => setSelectedGradient(gradients[trueIndex])}
                            >
                                <span className="gradient__option-name">{gradient.name}</span>
                            </div>
                        );
                    })}
            </div>
        );
    }

    return pages;
};

export const GradientPages = React.forwardRef((props: any, ref: RefObject<Carousel>) => {
    const { gradients, pageSize, setSelectedGradient } = props;

    return (
    <Carousel ref={ref} dots={false}>
        {generatePages(gradients, pageSize, setSelectedGradient)}
    </Carousel>
)});

export const GradientCarousel = React.memo(GradientPages);


