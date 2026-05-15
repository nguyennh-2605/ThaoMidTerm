import Layout from '../components/layout/Layout';

export default function Notifications() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Thông báo</h1>
        <p className="text-gray-600 mt-2">Không có thông báo mới</p>
      </div>
    </Layout>
  );
}
