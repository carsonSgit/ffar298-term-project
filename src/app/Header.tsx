"use client";

import React, { useState } from 'react';
import { AppBar, Button, MenuList, MenuListItem, Separator, Toolbar } from 'react95';

export default function Header() {
    const [open, setOpen] = useState(false);

    const openGithub = () => {
        window.open('https://github.com/carsonSgit/ffar298-term-project', '_blank');
    }

    const openProposal = () => {
        window.open('https://docs.google.com/document/d/1lKB0K-fe2YLlo6waSIBp50W932DxQ5GpjZAop0EU1oI/edit?usp=sharing', '_blank');
    }

    const openDocument = () => {
        window.open('https://docs.google.com/document/d/1lKB0K-fe2YLlo6waSIBp50W932DxQ5GpjZAop0EU1oI/edit?usp=sharing', '_blank');
    }
    return (
        <div style={{ padding: 20 }}>
            <AppBar style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Button
                            onClick={() => setOpen(!open)}
                            active={open}
                            style={{ fontSize: '1.2rem' }}
                        >
                            <img
                                src="/95.png"
                                style={{ height: '20px', marginRight: 4 }}
                            />
                            Documents
                        </Button>
                        {open && (
                            <MenuList
                                style={{
                                    position: 'absolute',
                                    left: '0',
                                    top: '75%',
                                }}
                                onClick={() => setOpen(false)}
                            >
                                <MenuListItem style={{ fontSize:"1.1rem", cursor:"pointer"}} onClick={openProposal}>
                                    Proposal
                                </MenuListItem>
                                <MenuListItem style={{ fontSize:"1.1rem", cursor:"pointer"}} onClick={openDocument}>
                                    Document
                                </MenuListItem>
                                <Separator />
                                <MenuListItem style={{ fontSize:"1.1rem", cursor:"pointer"}} onClick={openGithub}>
                                    GitHub
                                </MenuListItem>
                            </MenuList>
                        )}
                        <h1 style={{ margin: 0, fontSize: '1.5rem', marginLeft: '10px', fontWeight:"500" }}>The Impact of AI in the Holocene</h1>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
