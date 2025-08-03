import { Button, Card, Image } from 'antd';
import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

const TimerCard = styled(Card) <{ $isDisabled?: boolean, $color: string }>`
    background-color: ${props => props.$isDisabled ? 'rgb(200, 200, 200)' : props.$color};
    border-radius: 10px;
    border: 1px solid #222;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    margin: 0px 10px 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 250px;
    height: 250px;
    position: relative;
    transition: all 0.3s ease;
    filter: ${props => props.$isDisabled ? 'grayscale(100%)' : 'none'};
    
    &:hover .hover-button {
        opacity: 1;
        visibility: visible;
    }
    
    .disabled-button {
        opacity: 1;
        visibility: visible;
    }

    .timer-ready {
        color: rgb(93, 214, 114);
    }
`;

const TimerImage = styled(Image)`
    
`;

const TimerHotkey = styled.span<{ $isDisabled?: boolean }>`
    font-size: 12px;
    color: ${props => props.$isDisabled ? 'rgb(150, 150, 150)' : 'rgb(34, 34, 34)'};
    margin-top: 10px;
    transition: color 0.3s ease;
`;

const TimerTitle = styled.span<{ $isDisabled?: boolean }>`
    font-size: 22px;
    font-weight: bold;
    color: ${props => props.$isDisabled ? 'rgb(100, 100, 100)' : 'rgb(0, 0, 0)'};
    text-transform: uppercase;
    transition: color 0.3s ease;
`;

const TimerValue = styled.span<{ $isDisabled?: boolean, $isReady?: boolean }>`
    font-size: 40px;
    color: ${props => props.$isDisabled ? 'rgb(100, 100, 100)' : 'rgb(0, 0, 0)'};
    font-weight: bold;
    margin-top: -10px;
    transition: color 0.3s ease;
    ${props => props.$isReady && `
        color: rgb(93, 214, 114);
    `}
`;

const TimerContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const HoverButton = styled(Button) <{ $isDisabled?: boolean }>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: ${props => props.$isDisabled ? 1 : 0};
    visibility: ${props => props.$isDisabled ? 'visible' : 'hidden'};
    transition: all 0.3s ease;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.8);
    border: none;
    color: white;
    font-weight: bold;
    height: 50px;
    width: 150px;
    
    &:hover {
        background-color: rgba(0, 0, 0, 0.9);
        color: white;
    }
`;


interface TimerComponentProps {
    title: React.ReactNode;
    image: string;
    hotkey: string;
    alt: string;
    value: number;
    disabled?: boolean;
    ready?: boolean;
}

const TimerComponent: React.FC<TimerComponentProps> = ({ title, image, hotkey, alt, value, disabled, ready }) => {
    const [isDisabled, setIsDisabled] = useState(disabled);

    useEffect(() => {
        setIsDisabled(disabled);
    }, [disabled]);

    function getTimerColor(value: number) {
        if (value === 0) return 'rgb(255, 255, 255)';
        if (value <= 5) return 'rgb(255, 102, 102)';
        if (value <= 10) return 'rgb(255, 171, 75)';
        if (value <= 15) return 'rgb(252, 255, 51)';
        return 'rgb(255, 255, 255)';
    }

    return (
        <TimerCard $isDisabled={isDisabled} $color={getTimerColor(value)}>
            <TimerTitle $isDisabled={isDisabled}>{title}</TimerTitle>
            <TimerImage src={image} width={120} preview={false} alt={alt} />
            <TimerContent>
                <TimerValue $isReady={ready} $isDisabled={isDisabled}>{ready ? 'Ready' : value}</TimerValue>
                <TimerHotkey $isDisabled={isDisabled}>Press {hotkey} to start or stop the timer</TimerHotkey>
            </TimerContent>
            <HoverButton
                className={isDisabled ? "hover-button disabled-button" : "hover-button"}
                $isDisabled={isDisabled}
                onClick={() => setIsDisabled(!isDisabled)}>
                {isDisabled ? 'Enable Timer' : 'Disable Timer'}
            </HoverButton>
        </TimerCard>
    )
}

export default TimerComponent;