import { Component, signal, inject, AfterViewInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.css",
})
export class ContactComponent implements AfterViewInit {
  formData = { name: "", email: "", message: "" };
  submitted = signal(false);
  loading = signal(false);
  isVisible = signal(false);

  contactInfo = [
    {
      icon: "fa-solid fa-envelope",
      title: "Email",
      value: "shubhamsonawane1510@gmail.com",
      link: "mailto:shubhamsonawane1510@gmail.com",
      color: "from-primary to-purple"
    },
    {
      icon: "fa-solid fa-location-dot",
      title: "Location",
      value: "Pune, Maharashtra",
      link: null,
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "fa-solid fa-phone",
      title: "Phone",
      value: "+91-9175359676",
      link: "tel:+919175359676",
      color: "from-green-500 to-emerald-500"
    }
  ];

  socials = [
    {
      name: "GitHub",
      icon: "fa-brands fa-github",
      url: "https://github.com/ShubhamCodes1510",
      color: "bg-gray-800 hover:bg-gray-900"
    },
    {
      name: "LinkedIn",
      icon: "fa-brands fa-linkedin-in",
      url: "https://www.linkedin.com/in/shubham-sonawane-a871a1381/",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      name: "Twitter",
      icon: "fa-brands fa-twitter",
      url: "https://x.com/Shubham17082390",
      color: "bg-sky-500 hover:bg-sky-600"
    },
    {
      name: "Email",
      icon: "fa-solid fa-envelope",
      url: "mailto:shubhamsonawane1510@gmail.com",
      color: "bg-red-500 hover:bg-red-600"
    }
  ];

  ngAfterViewInit() {
    setTimeout(() => {
      this.isVisible.set(true);
    }, 100);
  }

  submitForm() {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      return;
    }

    this.loading.set(true);
    
    // Simulate API call
    setTimeout(() => {
      this.submitted.set(true);
      this.loading.set(false);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        this.submitted.set(false);
        this.formData = { name: "", email: "", message: "" };
      }, 3000);
    }, 1500);
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
