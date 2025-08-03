import React, { useState, useEffect } from 'react'
import './App.css'
import styled from 'styled-components';
import TimerComponent from './TimerComponent';
import MainTimerComponent from './MainTimerComponent';
import { Button, Cascader, Switch } from 'antd';

const megaHealth = new URL("../assets/mh.png", import.meta.url).href
const redArmor = new URL("../assets/ra.png", import.meta.url).href
const yellowArmor = new URL("../assets/ya.png", import.meta.url).href

const DarkThemeRoot = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TimerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Header = styled.h2`
  margin-top: 20px;
  text-align: left;
  margin-bottom: 10px;
  color:rgb(226, 62, 62);
  font-size: 72px;
  font-weight: bold;
  text-transform: uppercase;
`;

const SmallHeader = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  color:rgb(255, 171, 75);
  font-size: 22px;
  font-weight: bold;
`;

const MapPreset = styled(Cascader)`
  margin-bottom: 35px;
  font-weight: bold;
`;

const OptionsPanel = styled.div`
  display: flex;
  width: 97%;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const OptionsButton = styled(Button)`
  margin-top: -40px;
`;

const OnTopPanel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: -40px;
`;

interface Map {
  label: string;
  value: string;
  yellowArmorCount: number;
}

const maps: Map[] = [
  {
    label: 'Aerowalk',
    value: 'aerowalk',
    yellowArmorCount: 1
  },
  {
    label: 'Battleforged',
    value: 'battleforged',
    yellowArmorCount: 1
  },
  {
    label: 'Bloodrun',
    value: 'bloodrun',
    yellowArmorCount: 2
  },
  {
    label: 'Bloodister',
    value: 'bloodister',
    yellowArmorCount: 1 // TODO: Check if this is correct
  },
  {
    label: 'Campgrounds',
    value: 'campgrounds',
    yellowArmorCount: 1
  },
  {
    label: 'Cure',
    value: 'cure',
    yellowArmorCount: 1
  },
  {
    label: 'Dismemberment',
    value: 'dismemberment',
    yellowArmorCount: 1
  },
  {
    label: 'Elder',
    value: 'elder',
    yellowArmorCount: 1 // TODO: Check if this is correct
  },
  {
    label: 'Eldister',
    value: 'eldister',
    yellowArmorCount: 1
  }, {
    label: 'Furious Heights',
    value: 'furiousheights',
    yellowArmorCount: 2
  },
  {
    label: 'Hektik',
    value: 'hektik',
    yellowArmorCount: 1
  },
  {
    label: 'Lost World',
    value: 'lostworld',
    yellowArmorCount: 2
  },
  {
    label: 'Silence',
    value: 'silence',
    yellowArmorCount: 1
  },
  {
    label: 'Sinister',
    value: 'sinister',
    yellowArmorCount: 2
  },
  {
    label: 'Toxicity',
    value: 'toxicity',
    yellowArmorCount: 2
  },
  {
    label: 'Vertical Vengeance',
    value: 'verticalvengeance',
    yellowArmorCount: 1
  }
]

const App: React.FC = () => {
  const [megaHealthTimer, setMegaHealthTimer] = useState(0);
  const [redArmorTimer, setRedArmorTimer] = useState(0);
  const [yellowArmorTimer, setYellowArmorTimer] = useState(0);
  const [yellowArmorTimerTwo, setYellowArmorTimerTwo] = useState(0);
  const [yellowArmorTimerThree, setYellowArmorTimerThree] = useState(0);
  const [selectedMap, setSelectedMap] = useState<string[]>(['bloodrun']);
  const [yellowArmorCount, setYellowArmorCount] = useState(2);

  useEffect(() => {
    if (!window.timers) return

    window.timers.onTimerTick((state) => {
      if (state.name === 'MH') {
        setMegaHealthTimer(state.timeLeft && state.timeLeft > 0 ? state.timeLeft : 0)
      } else if (state.name === 'RA') {
        setRedArmorTimer(state.timeLeft && state.timeLeft > 0 ? state.timeLeft : 0)
      } else if (state.name === 'YA') {
        setYellowArmorTimer(state.timeLeft && state.timeLeft > 0 ? state.timeLeft : 0)
      } else if (state.name === 'YA2') {
        setYellowArmorTimerTwo(state.timeLeft && state.timeLeft > 0 ? state.timeLeft : 0)
      } else if (state.name === 'YA3') {
        setYellowArmorTimerThree(state.timeLeft && state.timeLeft > 0 ? state.timeLeft : 0)
      }
    })

    window.timers.onTimerStop((state) => {
      if (state.name === 'MH') {
        setMegaHealthTimer(0)
      } else if (state.name === 'RA') {
        setRedArmorTimer(0)
      } else if (state.name === 'YA') {
        setYellowArmorTimer(0)
      } else if (state.name === 'YA2') {
        setYellowArmorTimerTwo(0)
      } else if (state.name === 'YA3') {
        setYellowArmorTimerThree(0)
      }
    })

    window.timers.onTimerReset((state) => {
      if (state.name === 'MH') {
        setMegaHealthTimer(0)
      } else if (state.name === 'RA') {
        setRedArmorTimer(0)
      } else if (state.name === 'YA') {
        setYellowArmorTimer(0)
      } else if (state.name === 'YA2') {
        setYellowArmorTimerTwo(0)
      } else if (state.name === 'YA3') {
        setYellowArmorTimerThree(0)
      }
    })
  }, [])

  function isTimerReady(timer: number) {
    return timer === 0;
  }

  function getYellowArmorCount(value: string[]) {
    return maps.find(map => map.value === value[0])?.yellowArmorCount || 1;
  }

  return (
    <DarkThemeRoot className="dark-theme-root">
      <AppContainer>

        <Header>Quake Tools</Header>
        <SmallHeader>by AktiveHateXXX</SmallHeader>
        <OptionsPanel>
          <MapPreset size='large' defaultValue={selectedMap}
            options={maps}
            onChange={(value) => {
              setSelectedMap(value as string[]);
              setYellowArmorCount(getYellowArmorCount(value as string[]));
            }}
          />
          <OptionsButton type='primary' size='large'>
            Options
          </OptionsButton>
          <OnTopPanel>
            <Switch title='Hold window on top' />
            <span>Hold window on top</span>
          </OnTopPanel>
        </OptionsPanel>

        <TimerContainer>
          <MainTimerComponent title="MegaHealth"
            image={megaHealth}
            hotkey="F1"
            alt="MegaHealth"
            ready={isTimerReady(megaHealthTimer)}
            value={megaHealthTimer} />

          <MainTimerComponent title="Red Armor"
            image={redArmor}
            hotkey="F2"
            alt="Red Armor"
            ready={isTimerReady(redArmorTimer)}
            value={redArmorTimer} />
        </TimerContainer>

        <TimerContainer style={{ marginTop: '40px' }}>
          <TimerComponent title="Yellow Armor"
            image={yellowArmor}
            hotkey="F1"
            alt="Yellow Armor"
            ready={isTimerReady(yellowArmorTimer)}
            value={yellowArmorTimer} />

          <TimerComponent title="Yellow Armor"
            image={yellowArmor}
            hotkey="F2"
            alt="Yellow Armor"
            disabled={yellowArmorCount < 2}
            ready={isTimerReady(yellowArmorTimerTwo)}
            value={yellowArmorTimerTwo} />

          <TimerComponent title="Yellow Armor"
            image={yellowArmor}
            disabled={yellowArmorCount < 3}
            hotkey="F2"
            alt="Yellow Armor"
            ready={isTimerReady(yellowArmorTimerThree)}
            value={yellowArmorTimerThree} />
        </TimerContainer>

      </AppContainer>
    </DarkThemeRoot >
  )
}

export default App 