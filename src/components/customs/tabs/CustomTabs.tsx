import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type TTabs = {
  tabValue: string;
  tabText: string;
  component: React.ReactNode;
};

type Props = {
  defaultTab?: string;
  tabs: TTabs[];
};

const CustomTabs = ({ defaultTab, tabs }: Props) => {
  return (
    <Tabs defaultValue={defaultTab ?? tabs[0].tabValue}>
      <TabsList className="grid w-full grid-cols-2">
        {tabs.map((tab, index) => (
          <TabsTrigger key={index} value={tab.tabValue}>{tab.tabText}</TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab, index) => (
        <TabsContent key={index} value={tab.tabValue}>{tab.component}</TabsContent>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
