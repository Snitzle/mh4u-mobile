import { useQuery } from '@tanstack/react-query';
import { OptionPicker } from '@/components/OptionPicker';
import { api } from '@/lib/api';

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
}

export function MonsterPicker({ value, onChange }: Props) {
  const { data } = useQuery({ queryKey: ['monsters', 'all'], queryFn: () => api.monsters({ per_page: 200 }) });

  const options = (data?.data ?? []).map((monster) => ({ value: String(monster.id), label: monster.name }));

  return (
    <OptionPicker
      label="Monster"
      title="Filter by monster"
      placeholder="Any monster"
      value={value}
      options={options}
      onChange={onChange}
    />
  );
}
