'use client';

import LoadingScreen from '@/components/common/loading-screen';
import ModerationSearchBar from '@/components/features/moderator/moderation-searchbar';
import ModerationTable from '@/components/features/moderator/moderation-table';
import ModerationTitle from '@/components/features/moderator/moderation-title';
import { reportApi } from '@/services/api';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

type Report = {
  id: string;
  reason: string;
  details: string;
  isSolved: boolean;
  reporterId: string;
  targetType: string;
  createdAt: string;
};

function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('PENDING');
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchReports = useCallback(async () => {
    try {
      setIsLoading(true);
      // Simulando delay de API
      await new Promise((resolve) => setTimeout(resolve, 500));
      const result = await reportApi.listReports();
      setReports(result);
      console.log(reports);
      setIsLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching reports:', error.message);
      }
      router.replace('/');
    }
  }, [router]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full h-full overflow-x-hidden">
      <ModerationTitle title={'Denúncias'} />
      <div className="w-2/3 mx-auto">
        <ModerationSearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          variant="reports"
        />
      </div>
      <ModerationTable
        type="reports"
        searchTerm={searchTerm}
        activeFilter={activeFilter}
        data={reports}
      />
    </div>
  );
}

export default Page;
