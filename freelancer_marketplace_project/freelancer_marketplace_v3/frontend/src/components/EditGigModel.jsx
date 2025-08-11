import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import API from "../utils/api";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
const categories = [
  "Web Development",
  "UI/UX Design",
  "Video Editing",
  "Content Writing",
  "Graphic Design",
  "AI Services",
];

const EditGigModal = ({ open, onOpenChange, gig, onUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [formData, setFormData] = useState({
    title: gig?.title || "",
    description: gig?.description || "",
    category: gig?.category || "",
    price: gig?.price || "",
  });
  useEffect(() => {
    if (gig) {
      setFormData({
        title: gig.title || "",
        description: gig.description || "",
        category: gig.category || "",
        price: gig.price || "",
      });
    }
  }, [gig]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      if (thumbnail) {
        data.append("thumbnail", thumbnail);
      }

      await API.put(`/gigs/${gig._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onUpdated?.();
      onOpenChange(false);
      // Toast message
      toast.success("Gig updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update gig. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Toaster />
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Gig</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex gap-6">
          {/* Left: Thumbnail */}
          <div className="flex flex-col items-center w-1/2 space-y-4">
            <img
              src={
                thumbnail
                  ? URL.createObjectURL(thumbnail)
                  : gig?.thumbnail ||
                    "https://via.placeholder.com/400x240?text=No+Image"
              }
              alt="Thumbnail Preview"
              className="rounded-lg w-full h-48 object-cover border shadow"
            />
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          {/* Right: Editable Fields */}
          <div className="flex flex-col w-1/2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Professional Website Development"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                placeholder="Describe your service in detail..."
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="e.g., 100"
              />
            </div>
          </div>
        </form>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditGigModal;
