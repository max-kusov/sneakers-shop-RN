import React, { FC } from 'react'
import { Text, View, Modal, TouchableOpacity } from 'react-native';

import { COLORS } from '../../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

interface IModalProps {
  visible: boolean,
  setVisible: (value: boolean) => void;
}

const ModalPopup: FC<IModalProps> = ({ visible, setVisible }) => {

  return (
    <Modal visible={visible} transparent>
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <View style={{
          width: '80%',
          height: 300,
          backgroundColor: COLORS.white,
          elevation: 15,
          padding: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 20
        }}>
          <Text style={{
            fontSize: 18,
            color: 'rgba(0, 0, 0, .7)',
            marginBottom: 10
          }}>
            Заказ оформлен
          </Text>
          <View style={{
            alignItems: 'center',
          }}>
            <Text style={{
              fontSize: 16,
              color: 'rgba(0, 0, 0, .6)'
            }}>
              Номер Заказа:
            </Text>
            <Text style={{
              fontSize: 18,
              fontWeight: '700',
              marginTop: 5
            }}>
              {Math.floor(Math.random() * 100)}
            </Text>
          </View>

          <Text style={{
            fontSize: 16,
            color: 'rgba(0, 0, 0, .6)'
          }}>
            Адрес доставки:
          </Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10
          }}>
            <View style={{
              width: 50,
              height: 50,
              backgroundColor: 'rgba(0, 0, 0, .1)',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              marginRight: 10

            }}>
              <MaterialIcons name="place" size={24} color={COLORS.darkOrange} />
            </View>
            <Text style={{
              color: 'rgba(0, 0, 0, .5)'
            }}>
              Самара Южное шоссе 5,{'\n'} ТК 'АМБАР'
            </Text>
          </View>

          <TouchableOpacity style={{
            width: '90%',
            alignItems: 'center',
            backgroundColor: COLORS.orange,
            borderRadius: 7,
            padding: 10,
            elevation: 5,
          }}
            onPress={() => setVisible(false)}
          >
            <Text style={{
              color: COLORS.white,
            }}>
              Готово
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default ModalPopup