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
import identifyRegionsIterative from './identify';

const ResultScreen = ({route}) => {
  const {image, matrics, bbox, imgH, imgW} = route.params;
  const [resizeW, setResizeW] = useState(null);
  const [resizeH, setResizeH] = useState(null);
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);
  //console.log('cai nha', matrics);

  const [scaleFactor, setScaleFactor] = useState(null);
  const [matrixX, setMatrixX] = useState(null);
  const [matrixY, setMatrixY] = useState(null);
  const [cellSize, setCellSize] = useState(null);

  console.log('img, bb, h, w', image, bbox, imgH, imgW);

  //
  const regions = identifyRegionsIterative(matrics);

  const renderRegions = () => {
    return regions.map((region, index) => {
      const regionStyle = {
        ...styles.region,
        backgroundColor: `rgba(0, 150, 136, ${1 - index * 0.1})`, // Different opacity for different regions
      };

      return region.map(([i, j]) => (
        <View
          key={`${i}-${j}`}
          style={[
            regionStyle,
            {
              top: i * 20,
              left: j * 20,
            },
          ]}
        />
      ));
    });
  };

  useEffect(() => {
    if (matrics && imgH && imgW) {
      const matrixRows = matrics.length;
      const matrixCols = matrics[0].length;
      const cellS = Math.min(imgW / matrixCols, imgH / matrixRows);
      setCellSize(cellS);
      const scaleF = cellS / Math.max(matrixRows, matrixCols);
      setScaleFactor(scaleF);
      const mX = 0;
      const mY = 0;

      setMatrixX(mX);
      setMatrixY(mY);

      console.log('mX', matrixX);
      console.log('mY', matrixY);
      console.log('cS', cellSize);
      console.log('sF', scaleFactor);
    }
  }, [matrics]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.text}>RESULT</Text>
        <View style={styles.frame}>
          <Image
            width={imgW}
            height={imgH}
            source={{uri: image.uri}}
            style={styles.image}
          />
          {/* <View style={{width: {imgW}, height: {imgH}, position: 'absolute'}}>
            {matrics.map((row, rowIndex) =>
              row.map((value, colIndex) => (
                <Rect
                  key={`${rowIndex}-${colIndex}`}
                  x={matrixX + colIndex * cellSize}
                  y={matrixY + rowIndex * cellSize}
                  width={cellSize}
                  height={cellSize}
                  fill={value === 1 ? 'green' : 'white'}
                  stroke="black"
                  strokeWidth="1"
                />
              )),
            )}
          </View> */}
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
        <View style={{width: {imgW}, height: {imgH}}}>{renderRegions()}</View>
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
    justifyContent: 'center',
    alignItems: 'center',
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
