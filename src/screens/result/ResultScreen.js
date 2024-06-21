import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {FONT_FAMILY, scale} from '../../constants';
import {useState, useEffect} from 'react';
import {Svg, Rect} from 'react-native-svg';

const ResultScreen = ({route}) => {
  const [resizeW, setResizeW] = useState(null);
  const [resizeH, setResizeH] = useState(null);
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);
  const {image, matrics} = route.params;
  console.log('cai nha', matrics.length);

  const [scaleFactor, setScaleFactor] = useState(null);
  const [matrixX, setMatrixX] = useState(null);
  const [matrixY, setMatrixY] = useState(null);
  const [cellSize, setCellSize] = useState(null);

  useEffect(() => {
    if (image) {
      setImgHeight(image.height);
      setImgWidth(image.width);
    }
    if (imgWidth && imgHeight) {
      if (imgHeight > 300) {
        setResizeH(300);
        const reW = 300 * (imgWidth / imgHeight);
        setResizeW(reW);
      } else {
        setResizeH(imgHeight);
        const reW = imgHeight * (imgWidth / imgHeight);
        setResizeW(reW);
      }
    }
  }, [imgWidth, imgHeight]);

  useEffect(() => {
    if (matrics) {
      const matrixRows = matrics.length;
      const matrixCols = matrics[0].length;

      const cellS = Math.min(imgWidth / matrixCols, imgHeight / matrixRows);
      setCellSize(cellS);

      const scaleF = cellSize / Math.max(matrixRows, matrixCols);
      setScaleFactor(scaleF);

      const mX = (imgWidth - matrixCols * cellSize) / 2;
      const mY = (imgHeight - matrixRows * cellSize) / 2;
      setMatrixX(mX);
      setMatrixY(mY);
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.text}>RESULT</Text>
        <View style={styles.frame}>
          <Image
            width={resizeW}
            height={resizeH}
            source={{uri: image.uri}}
            style={styles.image}
          />
          {matrics && (
            <Svg
              width={imgWidth}
              height={imgHeight}
              style={[StyleSheet.absoluteFill, styles.svgContainer]}>
              {matrics.map((row, rowIndex) =>
                row.map((value, colIndex) => (
                  <Rect
                    key={`${rowIndex}-${colIndex}`}
                    x={matrixX + colIndex * cellSize * scaleFactor}
                    y={matrixY + rowIndex * cellSize * scaleFactor}
                    width={cellSize * scaleFactor}
                    height={cellSize * scaleFactor}
                    fill={value === 1 ? 'green' : 'white'}
                    stroke="black"
                    strokeWidth="1"
                  />
                )),
              )}
            </Svg>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: 'rgba(227, 223, 205, 0.26)'},
            ]}>
            <Text style={[styles.label, {color: '#020843'}]}>SHARE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#020843'}]}>
            <Text style={[styles.label, {color: '#ffff'}]}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: scale(25),
    alignSelf: 'center',
    marginBottom: 10,
    color: '#020843',
    fontFamily: FONT_FAMILY.AbhayaSemiBold,
  },
  bodyContainer: {
    width: '95%',
    height: 'auto',
    marginTop: scale(50),
  },
  frame: {
    width: '100%',
    height: 300,
    backgroundColor: '#020843',
    borderRadius: 25,
    marginBottom: 20,
  },
  svgContainer: {
    position: 'absolute',
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '30%',
    height: 45,
    borderRadius: 30,
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#171717',
  },
  label: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.AbhayaMedium,
  },
});
