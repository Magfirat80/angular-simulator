import type { Preset } from "@primeuix/themes/types";
import type { Theme } from "../enums/Theme";

export interface IThemes {
  name: string,
  value: Theme,
  preset: Preset
}