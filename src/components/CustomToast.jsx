import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IonIcon } from './ui/icon';
import responsive from '@utils/responsive';

const ICON_CONFIG = {
  success: {
    name: 'checkmark-circle',
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.15)',
  },
  danger: {
    name: 'close-circle',
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.15)',
  },
  warning: {
    name: 'warning',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.15)',
  },
  normal: {
    name: 'information-circle',
    color: '#9CA3AF',
    bg: 'rgba(156,163,175,0.15)',
  },
};

export default function CustomToast({ toast, type = 'normal' }) {
  console.log('toast', toast);
  if (!toast) return null;

  const icon = ICON_CONFIG[type];

  return (
    <View style={styles.container}>
      {/* LEFT ICON */}
      <View style={[styles.iconWrapper, { backgroundColor: icon.bg }]}>
        <IonIcon name={icon.name} size={18} color={icon.color} />
      </View>

      {/* MESSAGE */}
      <Text style={styles.text} numberOfLines={2}>
        {toast.message}
      </Text>

      {/* CLOSE BUTTON */}
      <TouchableOpacity
        onPress={toast.onHide}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <IonIcon name="close" size={18} color="#D1D5DB" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#151616',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 14,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 2,
  },
  iconWrapper: {
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    padding: 5,
  },
  text: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: responsive.fontSize(13),
    fontWeight: '500',
    lineHeight: 20,
    marginRight: 12,
  },
});
