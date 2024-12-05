import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({title, subtitle, containerStyles, titleStyles}) => {
  return (
    <View className={containerStyles}>
      <Text className={`${titleStyles} text-white text-center font-semibold`}>{title}</Text>
      <Text className="text-sm text-gray-100 text-center">{subtitle}</Text>
    </View>
  )
}

export default InfoBox