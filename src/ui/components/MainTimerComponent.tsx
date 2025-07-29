import React from 'react'
import './App.css'
import styled from 'styled-components';
import { Card, Image } from 'antd';

const MainTimerCard = styled(Card)`
    background-color:rgb(255, 255, 255);
    border-radius: 10px;
    border: 1px solid #222;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    margin: 0px 10px 0px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 375px;
    height: 375px;
    position: relative;
    transition: all 0.3s ease;
    
    &:hover .hover-button {
        opacity: 1;
        visibility: visible;
    }
`;

const MainTimerImage = styled(Image)`
    
`;

const MainTimerHotkey = styled.span`
    font-size: 12px;
    color: rgb(34, 34, 34);
    margin-top: 10px;
    transition: color 0.3s ease;
`;

const MainTimerTitle = styled.span`
    font-size: 32px;
    font-weight: bold;
    color: rgb(0, 0, 0);
    text-transform: uppercase;
    transition: color 0.3s ease;
`;

const MainTimerValue = styled.span<{ $isReady?: boolean }>`
    font-size: 40px;
    color: rgb(0, 0, 0);
    font-weight: bold;
    margin-top: -10px;
    transition: color 0.3s ease;
    ${props => props.$isReady && `
        color: rgb(93, 214, 114);
    `}
`;

const MainTimerContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;


interface TimerComponentProps {
    title: React.ReactNode;
    image: string;
    hotkey: string;
    alt: string;
    value: number;
    ready?: boolean;
}

const MainTimerComponent: React.FC<TimerComponentProps> = ({ title, image, hotkey, alt, value, ready }) => {

    return (
        <MainTimerCard>
            <MainTimerTitle>{title}</MainTimerTitle>
            <MainTimerImage src={image} width={225} preview={false} alt={alt} />
            <MainTimerContent>
                <MainTimerValue $isReady={ready}>{ready ? 'Ready' : value}</MainTimerValue>
                <MainTimerHotkey>Press {hotkey} to start or stop the timer</MainTimerHotkey>
            </MainTimerContent>
        </MainTimerCard>
    )
}

export default MainTimerComponent;
