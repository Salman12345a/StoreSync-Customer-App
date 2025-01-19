import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '@utils/Constants';
import {useAuthStore} from '@state/authStore';
import DeliveryHeader from '@components/delivery/DeliveryHeader';
import TabBar from '@components/delivery/TabBar';
import {fetchOrders} from '@service/orderService';
import CustomText from '@components/ui/CustomText';
import OrderItem from '@components/delivery/OrderItem';

export default function DeliveryDashboard() {
  const {user} = useAuthStore();
  const [selectedTab, setSelectedTab] = useState<'available' | 'delivered'>(
    'available',
  );
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [refreshing, setRefereshing] = useState(false);
  const [error, setError] = useState<string | null>(null); // New state for errors

  const renderOrderItem = ({item, index}: any) => (
    <OrderItem index={index} item={item} />
  );

  const fetchData = async () => {
    setRefereshing(true);
    setLoading(true);
    setError(null); // Reset errors before fetching

    const branchId = user?.branch || 'default-branch'; // Fallback for branchId
    const userId = user?._id || 'default-user'; // Fallback for userId

    const fetchedData = await fetchOrders(selectedTab, userId, branchId);
    if (!fetchedData) {
      setError('Failed to fetch orders. Please try again.'); // Handle API failure
    } else {
      setData(fetchedData);
    }
    setRefereshing(false);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedTab]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <DeliveryHeader name={user?.name} email={user?.email} />
      </SafeAreaView>
      <View style={styles.subContainer}>
        <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab} />
        {error && ( // Show error message
          <View style={styles.center}>
            <CustomText style={{color: Colors.text}}>{error}</CustomText>
          </View>
        )}
        <FlatList
          data={data}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }
          ListEmptyComponent={() => {
            if (loading) {
              return (
                <View style={styles.center}>
                  <ActivityIndicator size="small" color={Colors.secondary} />
                </View>
              );
            }
            return (
              <View style={styles.center}>
                <CustomText>No Orders Found</CustomText>
              </View>
            );
          }}
          renderItem={renderOrderItem}
          keyExtractor={item => item.orderId}
          contentContainerStyle={styles.flatlistContainer}
          showsVerticalScrollIndicator={false} // Disable the vertical scrollbar
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  subContainer: {
    backgroundColor: Colors.backgroundSecondary,
    flex: 1,
    padding: 6,
  },
  flatlistContainer: {
    padding: 2,
  },
  center: {
    flex: 1,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
