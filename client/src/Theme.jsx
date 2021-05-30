import { createMuiTheme } from '@material-ui/core/styles'
import {grey} from '@material-ui/core/colors';
const color1 = grey[50],
  color2 = "#50d890",
  color3 = "#4f98ca",
  color4 = "#272727";

export default createMuiTheme({
  palette: {
    common: {
      color1: `${color1}`,
      color2: `${color2}`,
      color3: `${color3}`,
      color4: `${color4}`,
    },
    primary: {
      main: `${color1}`,
    },
    secondary: {
      main: `${color2}`,
    },
    info: {
      main: `${color3}`,
    },
    success: {
      main: `${color4}`,
    },
  },
  typography: {
    tab: {
      fontFamily: "KoHo",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
    }
  }
})