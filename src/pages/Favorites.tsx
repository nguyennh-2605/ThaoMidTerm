import Layout from '../components/layout/Layout';

export default function Favorites() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Yêu thích</h1>
        <p className="text-gray-600 mt-2">Chưa có tuyến xe yêu thích</p>
      </div>
    </Layout>
  );
}
