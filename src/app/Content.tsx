"use client"

import React from 'react';
import { styled } from 'styled-components';
import { GroupBox, WindowContent, Window, WindowHeader } from 'react95';


const Container = styled.div`
    display: grid;
    grid-template-columns: 70% 30%;
    height: 100vh;
    padding: 20px;
`;

const LeftColumn = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const RightColumn = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export default function Content(){
    return (
        <div>
            <Container>
                <LeftColumn>
                    <Window shadow={false} style={{padding: "20px", width: "80%"}}>
                        <h1 style={{fontWeight:"normal", marginTop:"0.5rem"}}>Sample Title</h1>
                        <img src="/tempIMG.jpg" style={{height: "200px"}} alt="Sample"/>
                        <p style={{fontSize:"1.1rem"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                        </p>
                    </Window>
                    <Window shadow={false} style={{padding: "20px", width: "80%"}}>
                        <h1 style={{fontWeight:"normal", marginTop:"0.5rem"}}>Sample Title</h1>
                        <img src="/tempIMG.jpg" style={{height: "200px"}} alt="Sample"/>
                        <p style={{fontSize:"1.1rem"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                        </p>
                    </Window>
                </LeftColumn>
                <RightColumn>
                    <Window shadow={false}>
                        <WindowHeader style={{fontWeight:"normal", fontSize:"1.3rem"}}>Sample Environmental Issue</WindowHeader>
                        <WindowContent>
                        <GroupBox label="Sample Environmental Issue Clarification" disabled={false}>
                        <p style={{fontSize:"1.2rem", lineHeight:"1.2"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                        </p>
                        </GroupBox>
                        </WindowContent>
                    </Window>
                    <Window shadow={false}>
                        <WindowHeader style={{fontWeight:"normal", fontSize:"1.3rem"}}>Sample Environmental Issue</WindowHeader>
                        <WindowContent>
                        <GroupBox label="Sample Environmental Issue Clarification" disabled={false}>
                        <p style={{fontSize:"1.2rem", lineHeight:"1.2"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                        </p>
                        </GroupBox>
                        </WindowContent>
                    </Window>
                </RightColumn>
            </Container>
        </div>
    );
};
