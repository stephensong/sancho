/** @jsx jsx */
import { jsx, css, SerializedStyles } from "@emotion/core";
import * as React from "react";
import { Button, ButtonIntent, ButtonVariant, ButtonSize } from "../Button";
import { storiesOf } from "@storybook/react";
import theme from "../Theme";

export const ButtonStories = storiesOf("Button", module)
  .add("basic", () => {
    const sizes: Array<ButtonSize> = ["xs", "sm", "md", "lg", "xl"];

    const appearance: Array<ButtonVariant> = ["default", "ghost", "outline"];
    const intents: Array<ButtonIntent> = [
      "none",
      "primary",
      "success",
      "danger",
      "warning"
    ];

    return (
      <div>
        {appearance.map(appearance => (
          <div key={appearance}>
            {sizes.map(size => (
              <div key={size} style={{ padding: "0.5rem" }}>
                {intents.map(intent => (
                  <Button
                    key={size + appearance}
                    size={size}
                    css={{ marginRight: "1rem", textTransform: "capitalize" }}
                    variant={appearance}
                    intent={intent}
                    onClick={() => alert("hello there")}
                  >
                    {intent}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  })
  .add("disabled", () => {
    const variants: Array<ButtonVariant> = ["default", "ghost", "outline"];
    const intents: Array<ButtonIntent> = [
      "none",
      "primary",
      "success",
      "danger",
      "warning"
    ];

    return (
      <div>
        {variants.map(variant => {
          return (
            <div key={variant}>
              {intents.map(intent => (
                <Button
                  key={intent}
                  css={{ margin: "1rem" }}
                  intent={intent}
                  disabled
                  variant={variant}
                >
                  {intent}
                </Button>
              ))}
            </div>
          );
        })}
      </div>
    );
  })
  .add("with icons", () => (
    <div
      css={{
        "& > *": {
          margin: theme.spaces.md
        }
      }}
    >
      <Button iconBefore="chart">Icon before</Button>
      <Button iconAfter="arrow-right">Icon after</Button>
      <Button iconBefore="chart" iconAfter="arrow-right">
        Icon before and after
      </Button>
      <Button intent="primary" iconAfter="arrow-right">
        Icon after
      </Button>
      <Button intent="primary" variant="outline" iconAfter="arrow-right">
        Icon after
      </Button>
      <Button intent="primary" variant="ghost" iconAfter="arrow-right">
        Icon after
      </Button>
    </div>
  ))
  .add("block", () => {
    return (
      <div
        css={{
          "& > *": {
            maxWidth: "300px",
            marginTop: theme.spaces.md
          }
        }}
      >
        <Button block>Hello</Button>
        <Button block iconBefore="chevron-left">
          with icon before
        </Button>
        <Button block iconAfter="chevron-right">
          With icon after
        </Button>
        <Button block iconBefore="chevron-backward" iconAfter="chart">
          Two icons
        </Button>
      </div>
    );
  });
