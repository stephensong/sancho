/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Popover, ResponsivePopover } from "../Popover";
import { Button } from "../Button";
import { MenuList, MenuItem, MenuDivider } from "../Menu";
import { IconButton } from "../IconButton";
import { storiesOf } from "@storybook/react";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

const Link = React.forwardRef((props: LinkProps, ref: React.Ref<any>) => (
  <div
    ref={ref}
    css={{
      ":focus": {
        backgroundColor: "blue"
      }
    }}
    {...props}
  >
    {props.children}
  </div>
));

export const PopoverStories = storiesOf("Popover", module)
  .add("Focus management", () => {
    return (
      <div css={{ padding: "300px", background: "#eee" }}>
        <Popover
          content={
            <div css={{ padding: "2rem" }}>
              <Button>I should focus</Button>
            </div>
          }
        >
          <Button>Hello world!</Button>
        </Popover>
      </div>
    );
  })
  .add("Dropdown menu", () => {
    return (
      <div css={{ padding: "300px", minHeight: "150vh", background: "#eee" }}>
        <Popover
          content={
            <MenuList>
              <MenuItem onSelect={() => alert("Hello 1")}>
                I will trigger an alert
              </MenuItem>
              <MenuItem component="a" href="/bacon">
                I'm a link
              </MenuItem>

              <MenuDivider />
              <MenuItem>Item three</MenuItem>
            </MenuList>
          }
        >
          <Button>I should trigger popover</Button>
        </Popover>
      </div>
    );
  })
  .add("Triggered with an icon button", () => {
    return (
      <div css={{ padding: "300px", minHeight: "150vh", background: "#eee" }}>
        <Popover
          content={
            <MenuList>
              <MenuItem onSelect={() => alert("Hello 1")}>Item one</MenuItem>
              <MenuItem>Item three</MenuItem>
              <MenuDivider />
              <MenuItem>Item three</MenuItem>
              <MenuItem>Item three</MenuItem>
              <MenuItem>Item three</MenuItem>
            </MenuList>
          }
        >
          <IconButton variant="ghost" icon="more" label="show more" />
        </Popover>
      </div>
    );
  })
  .add("ResponsivePopover", () => {
    return (
      <div css={{ padding: "300px", minHeight: "150vh", background: "#eee" }}>
        <ResponsivePopover
          content={
            <MenuList>
              <MenuItem onSelect={() => alert("Hello 1")}>
                Drink coffee
              </MenuItem>
              <MenuItem>Eat pancakes</MenuItem>
              <MenuDivider />
              <MenuItem>Make pizza</MenuItem>
              <MenuItem>Dance my heart out</MenuItem>
              <MenuItem>Anything you ask</MenuItem>
            </MenuList>
          }
        >
          <IconButton variant="ghost" icon="more" label="show more" />
        </ResponsivePopover>
      </div>
    );
  });
