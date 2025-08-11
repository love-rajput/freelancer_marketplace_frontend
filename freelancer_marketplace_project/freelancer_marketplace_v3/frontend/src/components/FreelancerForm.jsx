import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import API from "../utils/api";

const roles = [
  "Web Developer",
  "UI/UX Designer",
  "Video Editor",
  "Content Writer",
  "Graphic Designer",
  "AI Specialist",
];
const languages = [
  "English",
  "Hindi",
  "Gujarati",
  "Tamil",
  "Telugu",
  "Bengali",
  "Kannada",
];

const FreelancerForm = ({ open, onOpenChange, freelancer, onSave }) => {
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    skills: "",
    experience: "",
    language: "",
  });
  const [loading, setLoading] = useState(false);

  // Pre-fill form with existing freelancer data
  useEffect(() => {
    if (freelancer) {
      setFormData({
        category: freelancer.category || "",
        description: freelancer.description || "",
        skills: freelancer.skills ? freelancer.skills.join(", ") : "",
        experience: freelancer.experience || "",
        language: freelancer.language || "",
      });
    }
  }, [freelancer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/freelancers/create", {
        category: formData.category,
        description: formData.description,
        skills: formData.skills.split(",").map((s) => s.trim()),
        experience: formData.experience,
        language: formData.language,
      });
      onSave(); // Let parent know to refresh
      onOpenChange(false);
      
    } catch (err) {
      console.error("Error updating freelancer profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Update your Freelancer Profile</DialogTitle>
          <DialogDescription>
            Showcase your skills and experience to attract clients. Click save
            when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select your primary role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="A brief description of your services and background."
              className="col-span-3"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skills" className="text-right">
              Skills
            </Label>
            <Input
              id="skills"
              value={formData.skills}
              onChange={(e) =>
                setFormData({ ...formData, skills: e.target.value })
              }
              placeholder="e.g., React, Node.js, Figma"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="experience" className="text-right">
              Experience
            </Label>
            <Input
              id="experience"
              type="number"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              placeholder="Years of experience"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="language" className="text-right">
              Language
            </Label>
            <Select
              id="language"
              value={formData.language}
              onValueChange={(value) =>
                setFormData({ ...formData, language: value })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select your primary language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Profile"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FreelancerForm;
