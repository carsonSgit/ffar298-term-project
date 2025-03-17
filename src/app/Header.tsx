"use client";

import React, { useState } from 'react';
import { AppBar, Button, MenuList, MenuListItem, Separator, Toolbar } from 'react95';

export default function Header() {
    const [open, setOpen] = useState(false);

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
                                src="/tempIMG.jpg"
                                style={{ height: '20px', marginRight: 4 }}
                            />
                            Info
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
                                <MenuListItem style={{ fontSize:"1.1rem" }}>
                                    Sample Item
                                </MenuListItem>
                                <Separator />
                                <MenuListItem style={{ fontSize:"1.1rem" }}>
                                    Sample Item
                                </MenuListItem>
                            </MenuList>
                        )}
                        <h1 style={{ margin: 0, fontSize: '1.5rem', marginLeft: '10px', fontWeight:"500" }}>AI Environmental Impact</h1>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
