import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const JobFilters = ({ filters, onFilterChange, onClearFilters }) => {
  return (
    <div className="w-64 space-y-6">
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={filters.jobLocation}
          onChange={(e) => onFilterChange({ jobLocation: e.target.value })}
          placeholder="Enter location"
        />
      </div>

      <div>
        <Label>Job Type</Label>
        {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <Checkbox
              id={`job-type-${type}`}
              checked={filters?.jobType?.includes(type)}
              onCheckedChange={(checked) => {
                const newJobTypes = checked
                  ? [...filters.jobType, type]
                  : filters.jobType.filter((t) => t !== type);
                onFilterChange({ jobType: newJobTypes });
              }}
            />
            <Label htmlFor={`job-type-${type}`}>{type}</Label>
          </div>
        ))}
      </div>

      <div>
        <Label>Salary Range</Label>
        <div className="flex space-x-2">
          <Input
            type="number"
            value={filters.minSalary}
            onChange={(e) => onFilterChange({ minSalary: e.target.value })}
            placeholder="Min"
          />
          <Input
            type="number"
            value={filters.maxSalary}
            onChange={(e) => onFilterChange({ maxSalary: e.target.value })}
            placeholder="Max"
          />
        </div>
      </div>

      <Button onClick={onClearFilters} variant="outline">
        Clear Filters
      </Button>
    </div>
  );
};

export default JobFilters;