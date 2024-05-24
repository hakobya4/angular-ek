import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-contact-page",
  templateUrl: "./contact-page.component.html",
  styleUrl: "./contact-page.component.css",
})
export class ContactPageComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      message: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log("Form Submitted", this.contactForm.value);
      // Handle form submission logic here
    } else {
      console.log("Form not valid");
    }
  }
}
