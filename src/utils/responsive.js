import { Dimensions, PixelRatio } from 'react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Define base dimensions (Reference: iPhone X)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// Scaling Functions
const scaleSize = size => (width / BASE_WIDTH) * size;
const verticalScaleSize = size => (height / BASE_HEIGHT) * size;

// Improved Font Scaling (Handles Pixel Density)
const responsiveFontSize = size => {
  const scaleFactor = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);
  return Math.round(size * scaleFactor) / PixelRatio.getFontScale();
};

// Responsive Object
const responsive = {
  width: size => scaleSize(size),
  height: size => verticalScaleSize(size),
  fontSize: size => responsiveFontSize(size + 1),
  margin: size => scaleSize(size),
  padding: size => scaleSize(size),
  borderRadius: size => scaleSize(size),
};

export default responsive;
