/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { Text } from "./Text";
import theme from "./Theme";
import VisuallyHidden from "@reach/visually-hidden";
import PropTypes from "prop-types";
import { alpha } from "./Theme/colors";
import { Icon } from "./Icons";
import { useUid } from "./Hooks/use-uid";

const inputSizes = {
  sm: css({
    fontSize: theme.sizes[0],
    padding: "0.25rem 0.5rem"
  }),
  md: css({
    fontSize: theme.sizes[1],
    padding: "0.375rem 0.75rem"
  }),
  lg: css({
    fontSize: theme.sizes[2],
    padding: "0.5rem 1rem"
  })
};

export type InputSize = keyof typeof inputSizes;

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  /** A label is required for accessibility purposes. Use `hideLabel` to hide it. */
  label: string;
  /** Visually hide the label. It remains accessible to screen readers. */
  hideLabel?: boolean;
  error?: string | React.ReactNode;
  /** Optional help text */
  helpText?: string;
  /** A single input element */
  children?: React.ReactNode;
}

export const InputGroup: React.FunctionComponent<InputGroupProps> = ({
  id,
  label,
  children,
  error,
  helpText,
  hideLabel,
  ...other
}) => {
  const uid = useUid(id);

  return (
    <div
      className="InputGroup"
      css={{
        marginTop: theme.spaces.md,
        ":first-child": {
          marginTop: 0
        }
      }}
      {...other}
    >
      <Label hide={hideLabel} htmlFor={uid}>
        {label}
      </Label>
      {React.isValidElement(children) &&
        React.cloneElement(children as React.ReactElement<any>, {
          id: uid
        })}

      {error && typeof error === "string" ? (
        <div
          className="InputGroup__error"
          css={{
            alignItems: "center",
            marginTop: theme.spaces.xs,
            display: "flex"
          }}
        >
          <Icon
            icon="error"
            color={theme.colors.intent.danger.base}
            size={14}
          />
          <Text
            css={{
              display: "block",
              marginLeft: theme.spaces.xs,
              fontSize: theme.sizes[0],
              color: theme.colors.intent.danger.base
            }}
          >
            {error}
          </Text>
        </div>
      ) : (
        error
      )}

      {helpText && (
        <Text
          className="InputGroup__help"
          css={{
            display: "block",
            marginTop: theme.spaces.xs,
            color: theme.colors.text.muted,
            fontSize: theme.sizes[0]
          }}
          variant="body"
        >
          {helpText}
        </Text>
      )}
    </div>
  );
};

InputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  helpText: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

const gray = theme.colors.palette.gray.base;
const blue = theme.colors.palette.blue.base;

export const baseStyles = css({
  display: "block",
  width: "100%",
  lineHeight: "1.5",
  color: theme.colors.text.default,
  backgroundColor: "white",
  backgroundImage: "none",
  backgroundClip: "padding-box",
  WebkitFontSmoothing: "antialiased",
  WebkitTapHighlightColor: "transparent",
  WebkitAppearance: "none",
  boxSizing: "border-box",
  touchAction: "manipulation",
  fontFamily: theme.fonts.base,
  border: "none",
  boxShadow: `inset 0 0 0 1px ${alpha(gray, 0.15)}, inset 0 1px 2px ${alpha(
    gray,
    0.2
  )}`,
  borderRadius: theme.radii.sm,
  transition:
    "background 0.25s cubic-bezier(0.35,0,0.25,1), border-color 0.15s cubic-bezier(0.35,0,0.25,1), box-shadow 0.15s cubic-bezier(0.35,0,0.25,1)",
  "::placeholder": {
    color: alpha(gray, 0.7)
  },
  ":focus": {
    boxShadow: `inset 0 0 2px ${alpha(gray, 0.4)}, inset 0 0 0 1px ${alpha(
      blue,
      0.3
    )}, 0 0 0 3px ${alpha(blue, 0.2)}`,
    outline: "none"
  },
  ":disabled": {
    boxShadow: `inset 0 0 0 1px ${alpha(gray, 0.45)}`
  },
  ":active": {
    background: theme.colors.background.tint1
  }
});

const activeBackground = css({ background: theme.colors.background.tint1 });

function useActiveStyle() {
  const [active, setActive] = React.useState(false);
  return {
    bind: {
      onTouchStart: () => setActive(true),
      onTouchEnd: () => setActive(false)
    },
    active
  };
}

export interface InputBaseProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** The size of the input element */
  inputSize?: InputSize;
}

/**
 * Our basic Input element. Use this when building customized
 * forms. Otherwise, stick with InputGroup
 */

export const InputBase: React.FunctionComponent<InputBaseProps> = ({
  autoComplete,
  autoFocus,
  inputSize = "md",
  ...other
}) => {
  const { bind, active } = useActiveStyle();

  return (
    <input
      className="Input"
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      {...bind}
      css={[baseStyles, inputSizes[inputSize], active && activeBackground]}
      {...other}
    />
  );
};

InputBase.propTypes = {
  inputSize: PropTypes.oneOf(["sm", "md", "lg"] as InputSize[])
};

export const Input = InputBase;

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** The size of the textarea element */
  inputSize?: InputSize;
}

/**
 * Textarea version of InputBase
 */

export const TextArea: React.FunctionComponent<TextAreaProps> = ({
  inputSize = "md",
  ...other
}) => {
  const { bind, active } = useActiveStyle();

  return (
    <textarea
      className="TextArea"
      {...bind}
      css={[
        baseStyles,
        inputSizes[inputSize],
        {
          overflow: "auto",
          resize: "vertical"
        },
        active && activeBackground
      ]}
      {...other}
    />
  );
};

TextArea.propTypes = {
  inputSize: PropTypes.oneOf(["sm", "md", "lg"] as InputSize[])
};

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  hide?: boolean;
  htmlFor: string;
}

/**
 * A styled Label to go along with input elements
 */

export const Label: React.FunctionComponent<LabelProps> = ({
  children,
  hide,
  ...other
}) => {
  const child = (
    <label
      className="Label"
      css={{
        display: "inline-block",
        marginBottom: hide ? 0 : theme.spaces.xs
      }}
      {...other}
    >
      <Text className="Label__text" variant={"subtitle"}>
        {children}
      </Text>
    </label>
  );

  return hide ? <VisuallyHidden>{child}</VisuallyHidden> : child;
};

Label.propTypes = {
  hide: PropTypes.bool
};

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** The size of the select box */
  inputSize?: InputSize;
}

const selectSize = {
  sm: inputSizes.sm,
  md: inputSizes.md,
  lg: inputSizes.lg
};

/**
 * A styled select menu
 */

export const Select: React.FunctionComponent<SelectProps> = ({
  multiple,
  inputSize = "md",
  ...other
}) => {
  return (
    <div
      className="Select"
      css={{
        position: "relative"
      }}
    >
      <select
        className="Select__input"
        css={[
          selectSize[inputSize],
          {
            WebkitAppearance: "none",
            display: "block",
            width: "100%",
            lineHeight: theme.lineHeight,
            color: theme.colors.text.dark,
            background: "white",
            fontFamily: theme.fonts.base,
            boxShadow: `inset 0 0 0 1px ${alpha(
              gray,
              0.15
            )}, inset 0 1px 2px ${alpha(gray, 0.2)}`,
            border: "none",
            backgroundClip: "padding-box",
            borderRadius: theme.radii.sm,
            margin: 0,
            "& [disabled]": {
              opacity: 0.8,
              backgroundImage: "none",
              cursor: "not-allowed"
            },
            ":focus": {
              borderColor: theme.colors.palette.blue.base,
              boxShadow: `inset 0 0 2px ${alpha(
                gray,
                0.4
              )}, inset 0 0 0 1px ${alpha(blue, 0.3)}, 0 0 0 3px ${alpha(
                blue,
                0.2
              )}`,
              outline: 0
            }
          }
        ]}
        multiple={multiple}
        {...other}
      />
      {!multiple && (
        <Icon
          className="Select__icon"
          icon="double-caret-vertical"
          color={theme.colors.text.muted}
          css={{
            position: "absolute",
            top: "50%",
            right: "0.75rem",
            transform: "translateY(-50%)"
          }}
        />
      )}
    </div>
  );
};

Select.propTypes = {
  inputSize: PropTypes.oneOf(Object.keys(selectSize))
};

export interface CheckProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** A label for the checkmark. */
  label: string;
}

export const Check: React.FunctionComponent<CheckProps> = ({
  label,
  id,
  ...other
}) => {
  const uid = useUid(id);

  return (
    <div
      className="Check"
      css={{ display: "flex", alignItems: "center" }}
      {...other}
    >
      <input className="Check__input" type="checkbox" id={uid} {...other} />
      <label
        className="Check__label"
        css={{ marginLeft: theme.spaces.xs }}
        htmlFor={uid}
      >
        <Text>{label}</Text>
      </label>
    </div>
  );
};

Check.propTypes = {
  label: PropTypes.string.isRequired
};
