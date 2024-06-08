import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useFetchCustomerData from "@/hooks/fetchCustomerData";

interface Item {
  id: string;
  label: string;
}

const items: Item[] = [
  {
    id: "10000",
    label: "spends > INR 10000",
  },
  {
    id: "3visits",
    label: "visits <= 3",
  },
  {
    id: "3months",
    label: "last visit > 3month",
  },
];

const CustomerTable = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { data, error, loading } = useFetchCustomerData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading shop data.</div>;
  }

  // if (!data || !Array.isArray(data.shopDetails)) {
  //   return <div>No shop data available.</div>;
  // }
  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <>
      <div className="text-xl mt-4">Customer Table</div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap  items-center md:gap-4 gap-2 mt-2 pb-2"
      >
        <div className="">
          <label className=" text-sm">Filters: </label>
        </div>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-row text-sm items-center space-x-3 space-y-0"
          >
            <Checkbox
              checked={selectedItems.includes(item.id)}
              onCheckedChange={(checked: boolean) =>
                handleCheckboxChange(item.id, checked)
              }
              className="bg-gray-800"
            />
            <label className="font-normal">{item.label}</label>
          </div>
        ))}
        <Button type="submit" className="p-3 h-8">
          Show
        </Button>
      </form>
      <div className="text-sm">Total:</div>
    </>
  );
};

export default CustomerTable;
