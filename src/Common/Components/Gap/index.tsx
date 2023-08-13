import { FunctionComponent } from "react";
import styles from "./index.module.scss";

/**
 * Property of component.
 *
 * @property size Enumeration size of gap.
 */
interface IGap {
  size: 4 | 8 | 12 | 16 | 24 | 32 | 64 | 128;
}

/**
 * Component divider adding empty vertical space between components.
 * @inheritDoc
 */
export const Gap: FunctionComponent<IGap> = (props) => (
  <div className={styles["gap"]} data-gap-size={props.size}></div>
);
