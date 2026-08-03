import { Component, OnInit, signal, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.css",
})
export class FooterComponent implements OnInit {
  showBackToTop = signal(false);
  visitorCount = signal(0);
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
    { label: "Admin", href: "/admin" },
  ];

  socials = [
    {
      name: "GitHub",
      icon: "fa-brands fa-github",
      url: "https://github.com/ShubhamCodes1510",
    },
    {
      name: "LinkedIn",
      icon: "fa-brands fa-linkedin-in",
      url: "https://www.linkedin.com/in/shubham-sonawane-a871a1381/",
    },
    {
      name: "Twitter",
      icon: "fa-brands fa-twitter",
      url: "https://x.com/Shubham17082390",
    },
    {
      name: "Email",
      icon: "fa-solid fa-envelope",
      url: "mailto:shubhamsonawane1510@gmail.com",
    },
  ];

  ngOnInit() {
    this.loadVisitorCount();
  }

  @HostListener("window:scroll")
  onScroll() {
    this.showBackToTop.set(window.scrollY > 500);
  }

  private loadVisitorCount() {
    const stored = localStorage.getItem("visitorCount");
    const count = stored
      ? parseInt(stored) + 1
      : Math.floor(Math.random() * 500) + 100;
    localStorage.setItem("visitorCount", count.toString());
    this.visitorCount.set(count);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
